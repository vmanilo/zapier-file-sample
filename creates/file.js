
const getFileName = async (z, url) => {
  if (!url || !url.startsWith('http')) {
    return url;
  }

  return await z.request({
    url,
    method: 'HEAD'
  }).then(response => {
    const regExp = /filename=\"(.*)\"/gi;
    const header = response.headers.get('content-disposition');
    return regExp.exec(header)[1]
  });
};

const perform = async (z, bundle) => {
  const filename = await getFileName(z, bundle.inputData.file);
  const filenameInGroup = await getFileName(z, bundle.inputData.file_in_group);

  return {
    id: 1,
    name: filename,
    name_in_group: filenameInGroup
  };
};

module.exports = {
  key: 'file',
  noun: 'File',

  display: {
    label: 'Create File',
    description: 'Creates a new file, probably with input from previous steps.'
  },

  operation: {
    perform,

    inputFields: [
      {key: 'file', type: 'file', required: false},
      {
        key: 'Group',
        children: [
          {key: 'file_in_group', type: 'file', required: false}
        ]
      },
    ],

    sample: {
      id: 1,
      name: 'Test',
      name_in_group: 'Test in group'
    },

    outputFields: [
      {key: 'id', label: 'File id'},
      {key: 'name', label: 'File name'},
      {key: 'name_in_group', label: 'File name in group'}
    ]
  }
};
