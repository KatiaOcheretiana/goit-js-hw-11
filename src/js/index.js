import { selectors } from './selectors';
import { onSubmitSearch } from './functions';
import { onLoadMore } from './functions';


selectors.loadMore.classList.add('hidden')

selectors.form.addEventListener('submit', onSubmitSearch)

selectors.loadMore.addEventListener("click", onLoadMore)







