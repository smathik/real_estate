from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# class company_login(models.Models):


class company_profile(models.Model):

	# company_user = models.CharField(max_length=2000)
	user = models.ForeignKey('user_profile')
	project_name = models.CharField(max_length=2000)
	project_plot = models.CharField(max_length=2000)
	project_flat = models.CharField(max_length=2000)
	project_invoice = models.CharField(max_length=2000)


class user_profile(models.Model):

	# propert = models.ForeignKey(company_profile)
	user_name = models.CharField(max_length=2000)
	user_pswrd = models.CharField(max_length=2000)
	mobile_no = models.CharField(max_length=2000)
	city = models.CharField(max_length=2000)
	# allocate_property = models.CharField(max_length=2000)

class buy_property(models.Model):

	user = models.ForeignKey('user_profile')
	allocate_property = models.ForeignKey('company_profile')
	status =  models.CharField(max_length=2000)
