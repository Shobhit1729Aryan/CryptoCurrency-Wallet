#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String, Vec};

#[contracttype]
#[derive(Clone)]
pub struct Transfer {
    pub from_address: Address,
    pub to_address: Address,
    pub amount: i128,
    pub message: String,
    pub timestamp: u64,
}

#[contracttype]
pub enum DataKey {
    TransferCount,
    Transfer(u32),
}

#[contract]
pub struct WalletContract;

#[contractimpl]
impl WalletContract {
    pub fn create_transfer(
        env: Env,
        from_address: Address,
        to_address: Address,
        amount: i128,
        message: String,
    ) {
        from_address.require_auth();

        let transfer_count = Self::transfer_count(env.clone());
        let transfer = Transfer {
            from_address,
            to_address,
            amount,
            message,
            timestamp: env.ledger().timestamp(),
        };

        env.storage()
            .persistent()
            .set(&DataKey::Transfer(transfer_count), &transfer);
        env.storage()
            .persistent()
            .set(&DataKey::TransferCount, &(transfer_count + 1));
    }

    pub fn transfer_count(env: Env) -> u32 {
        env.storage()
            .persistent()
            .get(&DataKey::TransferCount)
            .unwrap_or(0)
    }

    pub fn get_transfers(env: Env) -> Vec<Transfer> {
        let transfer_count = Self::transfer_count(env.clone());
        let mut transfers = Vec::new(&env);

        for id in 0..transfer_count {
            if let Some(transfer) = env
                .storage()
                .persistent()
                .get::<DataKey, Transfer>(&DataKey::Transfer(id))
            {
                transfers.push_back(transfer);
            }
        }

        transfers
    }
}
