const bip39 = require("bip39");
const { hdkey } = require("ethereumjs-wallet");
const { ResponseStatus } = require("../enums.js");

// Generates a new mnemonic, private key and public address and hands the mnemonic back
async function createWallet(req, res) {
  try {
    const userMnemonic = bip39.generateMnemonic();
    const wallet = hdkey
      .fromMasterSeed(bip39.mnemonicToSeedSync(userMnemonic))
      .derivePath(`m/44'/60'/0'/0/0`)
      .getWallet();
    const userAddress = wallet.getAddressString();
    return res.json({
      status: ResponseStatus.Success,
      userMnemonic,
      userAddress,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: ResponseStatus.Error,
      userMnemonic: null,
      userAddress: null,
      error,
    });
  }
}

module.exports = {
  createWallet,
};
