import { selectors } from './selectors';
import { onSubmitSearch, onLoadMore } from "./functions";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a');
lightbox.refresh()

selectors.loadMore.classList.add('hidden')

selectors.form.addEventListener('submit', onSubmitSearch)

selectors.loadMore.addEventListener("click", onLoadMore)
