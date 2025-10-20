import crypto from 'crypto';
import { env } from './env';
import { ethers } from 'ethers';

let chain: { index: number; prevHash: string; dataHash: string; timestamp: number; hash: string }[] = [];

export const hashData = (buf: Buffer | string) => crypto.createHash('sha256').update(buf).digest('hex');

export const appendToChain = async (dataHash: string) => {
  const prevHash = chain.length ? chain[chain.length - 1].hash : '0'.repeat(64);
  const block = { index: chain.length, prevHash, dataHash, timestamp: Date.now(), hash: '' };
  block.hash = hashData(`${block.index}:${block.prevHash}:${block.dataHash}:${block.timestamp}`);
  chain.push(block);

  if (env.BLOCKCHAIN_RPC_URL && env.BLOCKCHAIN_PRIVATE_KEY) {
    try {
      const provider = new ethers.JsonRpcProvider(env.BLOCKCHAIN_RPC_URL);
      const wallet = new ethers.Wallet(env.BLOCKCHAIN_PRIVATE_KEY, provider);
      const tx = await wallet.sendTransaction({ to: await wallet.getAddress(), value: 0n, data: '0x' + Buffer.from(block.hash).toString('hex').slice(0, 64) });
      await tx.wait();
      return { block, txHash: tx.hash };
    } catch (e) {
      return { block };
    }
  }
  return { block };
};

export const verifyInChain = (dataHash: string) => chain.some(b => b.dataHash === dataHash);
