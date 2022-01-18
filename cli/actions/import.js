const prompts = require('prompts')
const { bold, dim } = require('kleur')

const { readJsonFiles, saveObjectsByChunks } = require('../utils')

async function importAction(
  productsIndices,
  productsIndicesNames,
  useVirtualReplicas
) {
  const [
    productsIndex,
    productsPriceAscIndex,
    productsPriceDescIndex,
    productsQuerySuggestionsIndex,
  ] = productsIndices

  const [
    productsIndexName,
    productsPriceAscIndexName,
    productsPriceDescIndexName,
  ] = productsIndicesNames

  const productsIndexExists = await productsIndex.exists()
  const productsQuerySuggestionsIndexExists =
    await productsQuerySuggestionsIndex.exists()

  if (productsIndexExists || productsQuerySuggestionsIndexExists) {
    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      message:
        'Some indices already exist in your Algolia application, are you sure you want to continue?',
      initial: false,
    })

    if (!confirm) {
      console.info(bold().red('✖ Cancelled, nothing was done'))
      return
    }
  }

  console.log()

  // Read the data files
  const [
    productsDataset,
    productsConfiguration,
    productsQuerySuggestionsDataset,
    productsQuerySuggestionsConfiguration,
  ] = await readJsonFiles([
    './data/products_dataset.json',
    './data/products_configuration.json',
    './data/products_query_suggestions_dataset.json',
    './data/products_query_suggestions_configuration.json',
  ])

  // Products index - Create replicas
  console.info(
    dim(`Create products ${useVirtualReplicas ? 'virtual ' : ''}replicas...`)
  )

  await productsIndex
    .setSettings({
      replicas: [
        useVirtualReplicas
          ? `virtual(${productsPriceAscIndexName})`
          : productsPriceAscIndexName,
        useVirtualReplicas
          ? `virtual(${productsPriceDescIndexName})`
          : productsPriceDescIndexName,
      ],
    })
    .wait()

  // Products index - Set settings
  console.info(dim('Set products index settings...'))

  await productsIndex.setSettings(productsConfiguration.settings, {
    forwardToReplicas: true,
  })

  // Products index - Save rules
  console.info(dim('Create products rules...'))

  await productsIndex.saveRules(productsConfiguration.rules, {
    forwardToReplicas: true,
    clearExistingRules: true,
  })

  // Products index - Save synonyms
  console.info(dim('Create products synonyms...'))

  await productsIndex.saveSynonyms(productsConfiguration.synonyms, {
    forwardToReplicas: true,
  })

  // Products index - Save objects
  console.info(dim('Save products records...'))

  await saveObjectsByChunks(productsIndex, JSON.stringify(productsDataset))

  // Products replicas - Set settings
  console.info(
    dim(
      `Update ${
        useVirtualReplicas ? 'virtual ' : ''
      }replicas custom ranking...`
    )
  )

  await productsPriceAscIndex.setSettings({
    customRanking: ['asc(price.value)', 'desc(reviews.bayesian_avg)'],
  })
  await productsPriceDescIndex.setSettings({
    customRanking: ['desc(price.value)', 'desc(reviews.bayesian_avg)'],
  })

  // Products query suggestions index - Set settings
  console.info(dim('Set products query suggestions index settings...'))

  await productsQuerySuggestionsIndex.setSettings(
    productsQuerySuggestionsConfiguration.settings
  )

  // Products query suggestions index - Save rules
  console.info(dim('Create products query suggestions rules...'))

  await productsQuerySuggestionsIndex.saveRules(
    productsQuerySuggestionsConfiguration.rules,
    {
      clearExistingRules: true,
    }
  )

  // Products query suggestions index - Save synonyms
  console.info(dim('Create products query suggestions synonyms...'))

  await productsQuerySuggestionsIndex.saveSynonyms(
    productsQuerySuggestionsConfiguration.synonyms
  )

  // Products query suggestions index - Save objects
  console.info(dim('Save products query suggestions records...'))

  const productsQuerySuggestionsFormatted = JSON.stringify(
    productsQuerySuggestionsDataset
  ).replace(/_products_index_name_/gi, productsIndexName)
  await saveObjectsByChunks(
    productsQuerySuggestionsIndex,
    productsQuerySuggestionsFormatted
  )

  console.log()
  console.info(bold().green('✔ Datasets imported successfully'))
}

module.exports = importAction
