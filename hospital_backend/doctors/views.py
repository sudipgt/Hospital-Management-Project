from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import DoctorProfile
from .serializers import DoctorProfileSerializer


class DoctorProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DoctorProfile.objects.filter(is_available=True).order_by('user__username')
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAuthenticated]