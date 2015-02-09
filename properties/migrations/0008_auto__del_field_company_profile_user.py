# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'company_profile.user'
        db.delete_column(u'properties_company_profile', 'user_id')


    def backwards(self, orm):

        # User chose to not deal with backwards NULL issues for 'company_profile.user'
        raise RuntimeError("Cannot reverse this migration. 'company_profile.user' and its values cannot be restored.")

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