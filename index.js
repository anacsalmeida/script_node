const express = require('express');
const app = express();
const port = 3000

// Função para verificar se um número é primo
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Função para calcular os números primos até um dado número
function getPrimes(limit) {
    const primes = [];
    for (let i = 2; i <= limit; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

// Rota para calcular e retornar os números primos
app.get('/primos', (req, res) => {
    const numero = parseInt(req.query.numero);

    if (isNaN(numero)) {
        return res.status(400).send('Por favor, forneça um número inteiro válido.');
    }

    const primes = getPrimes(numero);
    res.json(primes);
});

// Manipulador global de erros para capturar exceções e retornar status 500
app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err.stack);
    res.status(500).send('Erro interno do servidor!');
});

// Iniciar o servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
