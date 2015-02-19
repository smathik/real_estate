# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'buy_property'
        db.create_table(u'properties_buy_property', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.CharField')(max_length=2000)),
            ('pro_name', self.gf('django.db.models.fields.CharField')(max_length=2000)),
            ('flat', self.gf('django.db.models.fields.CharField')(max_length=2000)),
            ('plot', self.gf('django.db.models.fields.CharField')(max_length=2000)),
        ))
        db.send_create_signal(u'properties', ['buy_property'])


    def backwards(self, orm):
        # Deleting model 'buy_property'
        db.delete_table(u'properties_buy_property')


    models = {
        u'properties.buy_property': {
            'Meta': {'object_name': 'buy_property'},
            'flat': ('django.db.models.fields.CharField', [], {'max_length': '2000'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'plot': ('django.db.models.fields.CharField', [], {'max_length': '2000'}),
            'pro_name': ('django.db.models.fields.CharField', [], {'max_length': '2000'}),
            'user': ('django.db.models.fields.CharField', [], {'max_length': '2000'})
        },
        u'properties.company_profile': {
            'Meta': {'object_name': 'company_profile'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'project_flat': ('django.db.models.fields.CharField', [], {'max_length': '2000'}),
            'project_invoice': ('django.db.models.fields.CharField', [], {'max_length': '2000'}),
            'project_name': ('django.db.models.fields.CharField', [], {'max_length': '2000'}),
            'project_plot': ('django.db.models.fields.CharField', [], {'max_length': '2000'})
        },
        u'properties.user_profile': {
            'Meta': {'object_name': 'user_profile'},
            'city': ('django.db.models.fields.CharField', [], {'max_length': '2000'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mobile_no': ('django.db.models.fields.CharField', [], {'max_length': '2000'}),
            'user_name': ('django.db.models.fields.CharField', [], {'max_length': '2000'}),
            'user_pswrd': ('django.db.models.fields.CharField', [], {'max_length': '2000'})
        }
    }

    complete_apps = ['properties']