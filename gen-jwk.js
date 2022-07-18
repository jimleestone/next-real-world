const jose = require('jose');

async function gen() {
  const { publicKey, privateKey } = await jose.generateKeyPair('RS256');
  const privateJwk = await jose.exportJWK(privateKey);
  const publicJwk = await jose.exportJWK(publicKey);

  console.log(JSON.stringify(privateJwk));
  console.log(publicJwk);
}
gen();
