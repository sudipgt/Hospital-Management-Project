from rest_framework import serializers

from .models import Appointment, Prescription


class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.name', read_only=True)
    patient_phone = serializers.CharField(source='patient.phone', read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.username', read_only=True)

    diagnosis = serializers.CharField(source='prescription.diagnosis', read_only=True)
    medicines = serializers.CharField(source='prescription.medicines', read_only=True)
    advice = serializers.CharField(source='prescription.advice', read_only=True)
    follow_up_date = serializers.DateField(source='prescription.follow_up_date', read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id',
            'patient',
            'patient_name',
            'patient_phone',
            'doctor',
            'doctor_name',
            'appointment_date',
            'appointment_time',
            'symptoms',
            'status',
            'diagnosis',
            'medicines',
            'advice',
            'follow_up_date',
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