import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {Extrinsic} from "../types";
import {Balance} from "@polkadot/types/interfaces";


export async function handleBlock(block: SubstrateBlock): Promise<void> {
   

    const blockHash = block.block.header.hash.toString();

    await Promise.all(block.block.extrinsics.map(async extrinsic => {
        if (extrinsic.isSigned){

            const origin = extrinsic.signer.toString();
            const entity = new Extrinsic(extrinsic.hash.toString());
            entity.blockHash = blockHash;
            entity.blockHeight = block.block.header.number.toBigInt();
            entity.origin = origin;

            await entity.save();


        }


    }));

}


