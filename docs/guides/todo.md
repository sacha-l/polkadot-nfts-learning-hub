* Swaps 
    * Polkadot cheques to submit offers
    
* Offchain signing
    * Distribution: Minting from a collection
        * Collection owner presigns a mint
        * User will mint using that signature and pay the deposit fee
        * Before mint user will see the attributes and the metadata
        * Run script to put your private key to pre-sign the signatures (can be for any address OR for any adress - you need to consruct special object)
        * Send users to webapp: it imports json file and allows users to connect with their wallet and claim the button - you need to upload the json file somewhere
        think of meetup use case
    * Updating attributes 
        * Give oracle permission to update attributes
        * Presign an update: imagine oracle service wants to provide fancy feature to users. Its so expensive for an oracle to pay for updates of all items. But if they send the user presignatures to the user then the user can benefit from that feature by placing a deposit and then accepting the signature (submit offchain `update_presgin_attributes`)
        
        Way to avoid them to paying the fee and make the end user pay the fee instead. 

https://substrate.stackexchange.com/questions/8123/how-to-mint-offchain-nft-in-pallet-nfts/8184#8184 
