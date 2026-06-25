from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Appointment, Prescription
from .serializers import AppointmentSerializer, PrescriptionSerializer
from notifications.email_service import send_appointment_email


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        user = self.request.user

        base_queryset = Appointment.objects.exclude(
            status__in=['completed', 'cancelled']
        ).order_by(
            '-appointment_date',
            '-appointment_time'
        )

        if user.role in ['admin', 'reception']:
            return base_queryset

        if user.role == 'doctor':
            return base_queryset.filter(
                doctor__user=user
            )

        return Appointment.objects.none()

    def perform_create(self, serializer):
        user = self.request.user

        if user.role not in ['admin', 'reception']:
            raise PermissionDenied('Only admin or reception can book appointments.')

        appointment = serializer.save()

        send_appointment_email(appointment)

    def perform_update(self, serializer):
        user = self.request.user

        if user.role == 'doctor':
            raise PermissionDenied('Doctor cannot update appointment directly.')

        serializer.save()

    @action(detail=False, methods=['get'], url_path='history')
    def history(self, request):
        user = request.user

        if user.role in ['admin', 'reception']:
            history_appointments = Appointment.objects.filter(
                status__in=['completed', 'cancelled']
            ).order_by('-appointment_date', '-appointment_time')

        elif user.role == 'doctor':
            history_appointments = Appointment.objects.filter(
                status__in=['completed', 'cancelled'],
                doctor__user=user
            ).order_by('-appointment_date', '-appointment_time')

        else:
            history_appointments = Appointment.objects.none()

        serializer = self.get_serializer(history_appointments, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'], url_path='cancel')
    def cancel(self, request, pk=None):
        user = request.user

        if user.role not in ['admin', 'reception']:
            raise PermissionDenied('Only admin or reception can cancel appointments.')

        appointment = self.get_object()

        if appointment.status == 'completed':
            raise PermissionDenied('Completed appointments cannot be cancelled.')

        if appointment.status == 'cancelled':
            raise PermissionDenied('Appointment is already cancelled.')

        appointment.status = 'cancelled'
        appointment.save()

        serializer = self.get_serializer(appointment)
        return Response(serializer.data)


class PrescriptionViewSet(viewsets.ModelViewSet):
    serializer_class = PrescriptionSerializer

    def get_queryset(self):
        user = self.request.user

        if user.role in ['admin', 'reception']:
            return Prescription.objects.all().order_by('-created_at')

        if user.role == 'doctor':
            return Prescription.objects.filter(
                appointment__doctor__user=user
            ).order_by('-created_at')

        return Prescription.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        appointment = serializer.validated_data['appointment']

        if user.role != 'doctor':
            raise PermissionDenied('Only doctor can create prescription.')

        if appointment.doctor.user != user:
            raise PermissionDenied('Doctor can prescribe only for own appointment.')

        serializer.save()

    def perform_update(self, serializer):
        user = self.request.user
        prescription = self.get_object()

        if user.role != 'doctor':
            raise PermissionDenied('Only doctor can update prescription.')

        if prescription.appointment.doctor.user != user:
            raise PermissionDenied('Doctor can update only own prescription.')

        serializer.save()