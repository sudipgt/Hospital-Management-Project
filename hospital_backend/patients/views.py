from rest_framework import viewsets
from .models import Patient
from .serializers import PatientSerializer
from accounts.permissions import IsAdminOrReception


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all().order_by('-created_at')
    serializer_class = PatientSerializer
    permission_classes = [IsAdminOrReception]