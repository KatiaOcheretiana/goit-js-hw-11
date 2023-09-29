import { selectors } from './selectors';
import { onSubmitSearch } from '../js/functions';
import { onLoadMore } from '../js/functions';


selectors.loadMore.classList.add('hidden')

selectors.form.addEventListener('submit', onSubmitSearch)

selectors.loadMore.addEventListener("click", onLoadMore)







