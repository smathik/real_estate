# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'company_profile'
        db.create_table(u'properties_company_profile', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('project_name', self.gf('django.db.models.fields.CharField')(max_length=2000)),
            ('project_plot', self.gf('django.db.models.fields.CharField')(max_length=2000)),
            ('project_flat', self.gf('django.db.models.fields.CharField')(max_length=2000)),
            ('project_invoice', self.gf('django.db.models.fields.CharField')(max_length=2000)),
        ))
        db.send_create_signal(u'properties', ['company_profile'])

        # Adding model 'user_profile'
        db.create_table(u'properties_user_profile', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user_name', self.gf('django.db.models.fields.CharField')(max_length=2000)),
            ('user_pswrd', self.gf('django.db.models.fields.CharField')(max_length=2000)),
            ('mobile_no', self.gf('django.db.models.fields.CharField')(max_length=2000)),
            ('city', self.gf('django.db.models.fields.CharField')(max_length=2000)),
        ))
        db.send_create_signal(u'properties', ['user_profile'])

        # Adding model 'buy_property'
        db.create_table(u'properties_buy_property', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['properties.user_profile'])),
            ('allocate_property', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['properties.company_profile'])),
            ('status', self.gf('django.db.models.fields.CharField')(max_length=2000)),
        ))
        db.send_create_signal(u'properties', ['buy_property'])


    def backwards(self, orm):
        # Deleting model 'company_profile'
        db.delete_table(u'properties_company_profile')

        # Deleting model 'user_profile'
        db.delete_table(u'properties_user_profile')

        # Deleting model 'buy_property'
        db.delete_table(u'properties_buy_property')


    models = {
        u'properties.buy_property': {
            'Meta': {'object_name': 'buy_property'},
            'allocate_property': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['properties.company_profile']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'status': ('django.db.models.fields.CharField', [], {'max_length': '2000'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['properties.user_profile']"})
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