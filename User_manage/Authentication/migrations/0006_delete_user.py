# Generated by Django 4.2.5 on 2024-11-06 18:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("Authentication", "0005_alter_user_bio_alter_user_password"),
    ]

    operations = [
        migrations.DeleteModel(
            name="User",
        ),
    ]