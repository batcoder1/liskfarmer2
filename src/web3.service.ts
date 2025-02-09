import { Web3 } from 'web3';
import {
  ERC20_ABI,
  IONIC_ABI,
  IONIC_CONTRACT,
} from '../constants';

export class Web3Service {
  private web3: Web3;
  private account;
  private contractIonic;

  constructor(rpcUrl: string) {
    this.web3 = new Web3(rpcUrl);
    const privateKey: string = process.env.PRIVATE_KEY || '';
    this.account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    this.web3.eth.accounts.wallet.add(this.account);
    console.log('Account connected: ', this.account.address);

    this.contractIonic = new this.web3.eth.Contract(IONIC_ABI, IONIC_CONTRACT);
  }

  async borrow(amount: number) {
    try {
      const amountWei = this.web3.utils.toWei(amount, 'ether');

      const gasPrice = await this.web3.eth.getGasPrice();
      const gasLimit = await this.contractIonic.methods.borrow(amountWei).estimateGas({ from: this.account.address });

      const gas = Math.floor(Number(gasLimit) * 1.1).toFixed(0);

      await this.contractIonic.methods.borrow(amountWei).send({
        gas,
        gasPrice: Number(gasPrice).toFixed(0),
        from: this.account.address,
      });

      console.log('✅ Borrow successful');
      return true;
    } catch (error) {
      console.error('❌ Borrow failed');
      return false;
    }
  }

  async repay(amount: number): Promise<boolean> {
    try {
      const amountWei = this.web3.utils.toWei(amount, 'ether');

      const gasPrice = await this.web3.eth.getGasPrice();
      const gasLimit = await this.contractIonic.methods.repayBorrow(amountWei).estimateGas({ from: this.account.address });

      const gas = Math.floor(Number(gasLimit) * 1.1).toFixed(0);

      await this.contractIonic.methods.repayBorrow(amountWei).send({
        gas,
        gasPrice: Number(gasPrice).toFixed(0),
        from: this.account.address,
      });

      console.log('✅ Repay successful');
      return true;
    } catch (error) {
      console.error('❌ Repay failed');
      return false;
    }
  }
  async withdraw(amount: number): Promise<boolean> {
    try {
      const amountWei = this.web3.utils.toWei(amount, 'ether');

      const gasPrice = await this.web3.eth.getGasPrice();
      const gasLimit = await this.contractIonic.methods.redeemUnderlying(amountWei).estimateGas({ from: this.account.address });

      const gas = Math.floor(Number(gasLimit) * 1.1).toFixed(0);

      await this.contractIonic.methods.redeemUnderlying(amountWei).send({
        gas,
        gasPrice: Number(gasPrice).toFixed(0),
        from: this.account.address,
      });

      console.log('✅ Withdraw successful');
      return true;
    } catch (error) {
      console.error('❌ Withdraw failed');
      return false;
    }
  }
  async supply(amount: string): Promise<boolean> {
    try {
      const amountWei = this.web3.utils.toWei(amount, 'ether');

      const gasPrice = await this.web3.eth.getGasPrice();
      const gasLimit = await this.contractIonic.methods.mint(amountWei).estimateGas({ from: this.account.address });

      const gas = Math.floor(Number(gasLimit) * 1.1).toFixed(0);

      await this.contractIonic.methods.mint(amountWei).send({
        gas,
        gasPrice: Number(gasPrice).toFixed(0),
        from: this.account.address,
      });

      console.log('✅ Supply successful');
      return true;
    } catch (error) {
      console.error('❌ Supply failed');
      return false;
    }
  }

  async approve(spenser: string, tokenAddress: string, amount: number): Promise<boolean> {
    try {
      const contractErc20 = new this.web3.eth.Contract(ERC20_ABI, tokenAddress);
      const amountWei = this.web3.utils.toWei(amount, 'ether');

      const gasPrice = await this.web3.eth.getGasPrice();
      const gasLimit = await contractErc20.methods.approve(spenser, amountWei).estimateGas({ from: this.account.address });

      const gas = Math.floor(Number(gasLimit) * 1.1).toFixed(0);

      await contractErc20.methods.approve(spenser, amountWei).send({
        gas,
        gasPrice: Number(gasPrice).toFixed(0),
        from: this.account.address,
      });

      console.log('✅ Approve successful');
      return true;
    } catch (error) {
      console.error('❌ Approve failed');
      return false;
    }
  }

  public async getTokenBalance(tokenAddress: string): Promise<number | null> {
    try {
      let balance: any;

      const tokenContract = new this.web3.eth.Contract(ERC20_ABI, tokenAddress);
      balance = await tokenContract.methods.balanceOf(this.account.address).call();
      balance = this.web3.utils.fromWei(balance, 'ether');
      return Number(balance);
    } catch (error) {
      console.error('❌ Error getting token balance');
      return null;
    }
  }
}
