from rest_framework import serializers
from .models import DoctorProfile


class DoctorProfileSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='user.username', read_only=True)
    doctor_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = DoctorProfile
        fields = [
            'id',
            'user',
            'doctor_name',
            'doctor_email',
            'specialization',
            'qualification',
            'experience_years',
            'is_available',
            'created_at',
        ]