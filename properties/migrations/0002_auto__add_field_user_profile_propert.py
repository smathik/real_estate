# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'user_profile.propert'
        db.add_column(u'properties_user_profile', 'propert',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, to=orm['properties.company_profile']),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'user_profile.propert'
        db.delete_column(u'properties_user_profile', 'propert_id')


    models = {
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
            'allocate_property': ('django.db.models.fields.CharField', [], {'max_length': '2000'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'propert': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['properties.company_profile']"}),
            'user_name': ('django.db.models.fields.CharField', [], {'max_length': '2000'}),
            'user_pswrd': ('django.db.models.fields.CharField', [], {'max_length': '2000'})
        }
    }

    complete_apps = ['properties']