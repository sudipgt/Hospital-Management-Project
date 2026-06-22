from rest_framework import serializers
from .models import Appointment, Prescription


class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.username', read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id',
            'patient',
            'patient_name',
            'doctor',
            'doctor_name',
            'appointment_date',
            'appointment_time',
            'symptoms',
            'status',
            'created_at',
        ]


class PrescriptionSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(
        source='appointment.patient.name',
        read_only=True
    )

    doctor_name = serializers.CharField(
        source='appointment.doctor.user.username',
        read_only=True
    )

    class Meta:
        model = Prescription
        fields = [
            'id',
            'appointment',
            'patient_name',
            'doctor_name',
            'diagnosis',
            'medicines',
            'advice',
            'follow_up_date',
            'created_at',
        ]

    def create(self, validated_data):
        prescription = Prescription.objects.create(**validated_data)

        prescription.appointment.status = 'completed'
        prescription.appointment.save()

        return prescription