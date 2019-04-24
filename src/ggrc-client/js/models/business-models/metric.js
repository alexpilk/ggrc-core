/*
    Copyright (C) 2019 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import Cacheable from '../cacheable';
import uniqueTitle from '../mixins/unique-title';
import caUpdate from '../mixins/ca-update';
import timeboxed from '../mixins/timeboxed';
import accessControlList from '../mixins/access-control-list';
import scopeObjectNotifications from '../mixins/notifications/scope-object-notifications';
import questionnaire from '../mixins/questionnaire';
import Stub from '../stub';

export default Cacheable.extend({
  root_object: 'metric',
  root_collection: 'metrics',
  category: 'scope',
  findAll: '/api/metrics',
  findOne: '/api/metrics/{id}',
  create: 'POST /api/metrics',
  update: 'PUT /api/metrics/{id}',
  destroy: 'DELETE /api/metrics/{id}',
  mixins: [
    uniqueTitle,
    caUpdate,
    timeboxed,
    accessControlList,
    scopeObjectNotifications,
    questionnaire,
  ],
  attributes: {
    context: Stub,
    modified_by: Stub,
  },
  tree_view_options: {
    attr_list: Cacheable.attr_list.concat([
      {attr_title: 'Effective Date', attr_name: 'start_date'},
      {attr_title: 'Last Deprecated Date', attr_name: 'end_date'},
      {attr_title: 'Reference URL', attr_name: 'reference_url'},
      {
        attr_title: 'Launch Status',
        attr_name: 'status',
        order: 40,
      }, {
        attr_title: 'Description',
        attr_name: 'description',
        disable_sorting: true,
      }, {
        attr_title: 'Notes',
        attr_name: 'notes',
        disable_sorting: true,
      }, {
        attr_title: 'Assessment Procedure',
        attr_name: 'test_plan',
        disable_sorting: true,
      },
    ]),
    display_attr_names: ['title', 'status', 'updated_at'],
  },
  is_custom_attributable: true,
  isRoleable: true,
  defaults: {
    title: '',
    url: '',
    status: 'Draft',
  },
  sub_tree_view_options: {
    default_filter: ['Product'],
  },
  statuses: ['Draft', 'Deprecated', 'Active'],
  init: function () {
    this.validateNonBlank('title');
    this._super(...arguments);
  },
}, {});
