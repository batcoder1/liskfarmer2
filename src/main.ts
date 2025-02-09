import {
  IONIC_CONTRACT,
  LISK_RPC,
  LISK_TOKEN,
  MAX_APPROVE,
  WETH_TOKEN,
} from '../constants';
import { randomDelay, sleep } from '../utils/sleep';
import { Web3Service } from './web3.service';

const web3Service = new Web3Service(LISK_RPC);

// Enable or disable as you need
const BORROW_ACTIVE = true;
const SUPPLY_ACTIVE = true;

// Supply and borrow will be done with LISK, be sure you have enough amount of LISK
const BORROW_AMOUNT = 0.16;
const SUPPLY_AMOUNT = 0.01;

// Loops amount
const SUPPLIES = 10
const BORROWS = 15


async function main() {
  console.log(`📌 Start farming...`);

  console.log('🔏 Approving LISK...');
  let approvedLiskOk = await web3Service.approve(IONIC_CONTRACT, LISK_TOKEN, MAX_APPROVE);
  await sleep(2000);
  let counterApproveLisk = 0;
  while (!approvedLiskOk && counterApproveLisk < 5) {
    console.log('🔄 Trying approve again...')
    approvedLiskOk = await web3Service.approve(IONIC_CONTRACT, LISK_TOKEN, MAX_APPROVE);
    counterApproveLisk ++;
    await sleep(2000);

  }
  console.log('🔏 Approving WETH...');
  let approvedEthOk = await web3Service.approve(IONIC_CONTRACT, WETH_TOKEN, MAX_APPROVE);
  await sleep(2000);
  let approveEthCounter = 0;
  while (!approvedEthOk && approveEthCounter < 5) {
    console.log('🔄 Trying approve again...')
    approvedEthOk = await web3Service.approve(IONIC_CONTRACT, WETH_TOKEN, MAX_APPROVE);
    approveEthCounter ++;
    await sleep(2000);

  }

  let withdrawAmount = 0;
  if (SUPPLY_ACTIVE) {
    for (let i = 0; i < SUPPLIES; i++) {
      console.log(`💰 ${i} - Supply ${SUPPLY_AMOUNT}`);
      const resultOk = await web3Service.supply(SUPPLY_AMOUNT.toString());
      if(resultOk) {
        withdrawAmount += SUPPLY_AMOUNT;
      }
      console.log(`❄️ Cooling down...`);
      await randomDelay();
    }
    if (withdrawAmount > 0) {
      console.log(`🏦 Withdraw ${withdrawAmount}`);
      const resultOk = await web3Service.withdraw(withdrawAmount);
      if(!resultOk){
        await randomDelay();
        await web3Service.withdraw(withdrawAmount);
      }
      console.log(`❄️ Cooling down...`);
      await randomDelay();
    }
  }

  let repayAmount = 0;
  if (BORROW_ACTIVE) {
    for (let i = 0; i < BORROWS; i++) {
      console.log(`🔄 Borrow #${i + 1}...`);
      const borrowOk = await web3Service.borrow(BORROW_AMOUNT);
      if (borrowOk) {
        repayAmount += BORROW_AMOUNT;
      }
      if (i < 9) {
        console.log(`❄️ Cooling down...`);
        await randomDelay();
      }
    }

    if (repayAmount > 0) {
      console.log(`💰 Repay ${repayAmount}`);
      const resultOk = await web3Service.repay(repayAmount);
      if(!resultOk){
        await randomDelay();
        await web3Service.repay(repayAmount);
      }
    }
  }

  console.log('✅ Farming Finished.');
}
main().catch((error) => {
  console.error('An error occurred while starting the application:', error);
});
