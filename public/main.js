document.querySelector('.generate input[type=submit]').addEventListener('click', (event) => {
  fetch(`/generate/${document.querySelector('.generate input[name=number]').value}`)
    .then(res => res.json())
    .then(code => {
      document.getElementById('code').innerText = code.code;
    });
});

document.querySelector('.verify input[type=submit]').addEventListener('click', (event) => {
  fetch(`/verify/${document.querySelector('.verify input[name=number]').value}/${document.querySelector('.verify input[name=code]').value}`)
    .then(res => {
      if (res.status === 200) {
        document.getElementById('result').innerText = 'OK';
      } else {
        document.getElementById('result').innerText = 'Incorrect';
      }
    })

});
