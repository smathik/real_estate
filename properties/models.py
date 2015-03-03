from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# class company_login(models.Models):
class User(models.Model):

	# propert = models.ForeignKey(company_profile)
	user = models.OneToOneField(User)
	user_pswrd = models.CharField(max_length=2000)
	mobile_no = models.CharField(max_length=2000)
	city = models.CharField(max_length=2000)
	# allocate_property = models.CharField(max_length=2000)

class company_profile(models.Model):

	# company_user = models.CharField(max_length=2000)
	# user = models.IntegerField('user_profile')
	project_name = models.CharField(max_length=2000)
	project_plot = models.CharField(max_length=2000)
	project_flat = models.CharField(max_length=2000)
	project_invoice = models.CharField(max_length=2000)
	project_value = models.IntegerField(max_length=2000)




class buy_property(models.Model):

	user = models.ForeignKey('User')	
	pro_name = models.CharField(max_length=2000)
	flat =  models.CharField(max_length=2000)
	plot =  models.CharField(max_length=2000)
	amount = models.IntegerField(max_length=2000)
	rem = models.IntegerField(max_length=2000)


# class client_profile(models.Model):

# 	project_value = models.ForeignKey('company_profile')
# 	user = models.ForeignKey('')
# 	Total_install = models.CharField(max_length=2000)




