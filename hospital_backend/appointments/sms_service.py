import requests
from django.conf import settings


def send_appointment_sms(appointment):
    """
    Sends appointment SMS to patient after appointment booking.
    If SMS is disabled or fails, it will not break appointment booking.
    """

    if not settings.SMS_ENABLED:
        print("SMS disabled. Skipping SMS.")
        return False

    patient_phone = appointment.patient.phone

    if not patient_phone:
        print("Patient phone missing. SMS not sent.")
        return False

    message = (
        f"Dear {appointment.patient.name}, your appointment is booked with "
        f"Dr. {appointment.doctor.user.username} on "
        f"{appointment.appointment_date} at {appointment.appointment_time}. "
        f"Symptoms: {appointment.symptoms or 'N/A'}."
    )

    url = "https://www.fast2sms.com/dev/bulkV2"

    payload = {
        "route": "q",
        "message": message,
        "language": "english",
        "flash": 0,
        "numbers": patient_phone,
    }

    headers = {
        "authorization": settings.FAST2SMS_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
    }

    try:
        response = requests.post(
            url,
            data=payload,
            headers=headers,
            timeout=10,
        )

        print("SMS Response:", response.status_code, response.text)

        return response.status_code == 200

    except requests.RequestException as error:
        print("SMS sending failed:", error)
        return False