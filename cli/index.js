const algoliasearch = require('algoliasearch')
const prompts = require('prompts')
const { bold, underline } = require('kleur')

const importAction = require('./actions/import')
const deleteAction = require('./actions/delete')

const { getIndices } = require('./utils')

const getIndicesNames = (indexNamePrefix, indexNameProducts) => {
  return [
    `${indexNamePrefix}${indexNameProducts}`,
    `${indexNamePrefix}${indexNameProducts}_price_asc`,
    `${indexNamePrefix}${indexNameProducts}_price_desc`,
    `${indexNamePrefix}${indexNameProducts}_query_suggestions`,
  ]
}

const validateNotEmpty = (input) => Boolean(input)

const questions = [
  {
    type: 'select',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      {
        title: 'Import',
        description:
          'Import the preview datasets into your Algolia application.',
        value: 'import',
      },
      {
        title: 'Delete',
        description:
          'Delete the preview datasets from your Algolia application.',
        value: 'delete',
      },
    ],
    initial: 0,
  },
  {
    type: 'text',
    name: 'appId',
    message: 'What is your Algolia application ID?',
    initial: process.env.CLI_APP_ID,
    validate: validateNotEmpty,
  },
  {
    type: 'password',
    name: 'adminApiKey',
    message: 'What is your Algolia admin API key?',
    initial: process.env.CLI_ADMIN_API_KEY,
    validate: validateNotEmpty,
  },
  {
    type: 'text',
    name: 'indexNamePrefix',
    message: 'Choose the prefix used for each index name created',
    initial: 'pwa_ecom_ui_template_',
    validate: validateNotEmpty,
  },
  {
    type: 'text',
    name: 'indexNameProducts',
    message: 'Choose the products index name',
    initial: 'products',
    validate: validateNotEmpty,
  },
  {
    type: (prev, values) => (values.action === 'import' ? 'confirm' : null),
    name: 'useVirtualReplicas',
    message:
      'Do you want to use virtual replicas? (only available with the Premium plan)',
    initial: false,
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: (prev, { action, indexNamePrefix, indexNameProducts }) => {
      const productsIndicesNames = getIndicesNames(
        indexNamePrefix,
        indexNameProducts
      )
      return `Indices to ${underline(action)}:\n${productsIndicesNames
        .map((i) => `    - ${i}`)
        .join('\n')}\nAre you sure to continue?`
    },
    initial: true,
  },
]

;(async () => {
  let cancelled = false
  const onCancel = () => {
    cancelled = true
    return false
  }

  const {
    action,
    appId,
    adminApiKey,
    indexNamePrefix,
    indexNameProducts,
    useVirtualReplicas,
    confirm,
  } = await prompts(questions, {
    onCancel,
  })

  if (cancelled || !confirm) {
    console.log()
    console.info(bold().red('✖ Cancelled, nothing was done'))
    return
  }

  try {
    // Initialize the client
    const client = algoliasearch(appId, adminApiKey)

    // Products indices - Init
    const productsIndicesNames = getIndicesNames(
      indexNamePrefix,
      indexNameProducts
    )
    const productsIndices = await getIndices(client, productsIndicesNames)

    switch (action) {
      case 'import':
        await importAction(
          productsIndices,
          productsIndicesNames,
          useVirtualReplicas
        )
        break

      case 'delete':
        await deleteAction(productsIndices)
        break
    }
  } catch (err) {
    console.error(bold().red(`✖ Error: ${err.message}`))
  }
})()
