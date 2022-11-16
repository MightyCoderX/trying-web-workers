const worker = new Worker('worker.js');
const button = document.getElementById('btnTest');

button.addEventListener('click', () =>
{
    worker.postMessage(
    {
        name: 'fetchJPH',
        data: {}
    });
});

worker.addEventListener('message', e =>
{
    document.body.insertAdjacentHTML('beforeend', e.data.template);
});

worker.addEventListener('error', console.error);