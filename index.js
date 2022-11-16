const worker = new Worker('worker.js');
const button = document.getElementById('btnTest');

button.addEventListener('click', () =>
{
    button.setAttribute('disabled', '');
    document.querySelector('main').innerHTML = `<div class="loading"></div>`;
    worker.postMessage(
    {
        name: 'fetchJPH',
        data: {}
    });
});

worker.addEventListener('message', e =>
{
    button.removeAttribute('disabled');
    // document.body.insertAdjacentHTML('beforeend', e.data.template);
    document.querySelector('main').innerHTML = e.data.template;
});

worker.addEventListener('error', console.error);