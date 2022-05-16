from django.core.validators import RegexValidator


def phone_validator():
    phone_regex = RegexValidator(
        regex=r'^[0-9]*$',
        message="Favor de verificar la información"
    )
    return phone_regex
