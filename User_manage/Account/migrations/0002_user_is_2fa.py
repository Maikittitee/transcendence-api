# Generated by Django 4.2.5 on 2024-11-07 08:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Account", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="is_2fa",
            field=models.BooleanField(default=False),
        ),
    ]
