# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'buy_property.status'
        db.delete_column(u'properties_buy_property', 'status')

        # Deleting field 'buy_property.allocate_property'
        db.delete_column(u'properties_buy_property', 'allocate_property_id')

        # Adding field 'buy_property.pro_name'
        db.add_column(u'properties_buy_property', 'pro_name',
                      self.gf('django.db.models.fields.CharField')(default=1, max_length=2000),
                      keep_default=False)

        # Adding field 'buy_property.flat'
        db.add_column(u'properties_buy_property', 'flat',
                      self.gf('django.db.models.fields.CharField')(default=1, max_length=2000),
                      keep_default=False)

        # Adding field 'buy_property.plot'
        db.add_column(u'properties_buy_property', 'plot',
                      self.gf('django.db.models.fields.CharField')(default=1, max_length=2000),
                      keep_default=False)


        # Renaming column for 'buy_property.user' to match new field type.
        db.rename_column(u'properties_buy_property', 'user_id', 'user')
        # Changing field 'buy_property.user'
        db.alter_column(u'properties_buy_property', 'user', self.gf('django.db.models.fields.CharField')(max_length=2000))
        # Removing index on 'buy_property', fields ['user']
        db.delete_index(u'properties_buy_property', ['user_id'])


    def backwards(self, orm):
        # Adding index on 'buy_property', fields ['user']
        db.create_index(u'properties_buy_property', ['user_id'])

        # Adding field 'buy_property.status'
        db.add_column(u'properties_buy_property', 'status',
                      self.gf('django.db.models.fields.CharField')(default=1, max_length=2000),
                      keep_default=False)

        # Adding field 'buy_property.allocate_property'
        db.add_column(u'properties_buy_property', 'allocate_property',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, to=orm['properties.company_profile']),
                      keep_default=False)

        # Deleting field 'buy_property.pro_name'
        db.delete_column(u'properties_buy_property', 'pro_name')

        # Deleting field 'buy_property.flat'
        db.delete_column(u'properties_buy_property', 'flat')

        # Deleting field 'buy_property.plot'
        db.delete_column(u'properties_buy_property', 'plot')


        # Renaming column for 'buy_property.user' to match new field type.
        db.rename_column(u'properties_buy_property', 'user', 'user_id')
        # Changing field 'buy_property.user'
        db.alter_column(u'properties_buy_property', 'user_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['properties.user_profile']))

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