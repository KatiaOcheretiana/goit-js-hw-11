
export function makeMarkup(searchData) {
  const result = searchData.map(item => `<div class="photo-card">
    <a href="${item.largeImageURL}">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b><span>Likes</span> ${item.likes}</b>
    </p>
    <p class="info-item">
      <b><span>Views</span> ${item.views}</b>
    </p>
    <p class="info-item">
      <b><span>Comments</span> ${item.comments}</b>
    </p>
    <p class="info-item">
      <b><span>Downloads</span> ${item.downloads}</b>
    </p>
  </div>
</div>`).join('')
  
  const lightbox = new SimpleLightbox('.gallery a');

    return result
      


}