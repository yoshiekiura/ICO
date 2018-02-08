#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pandas as pd
import math
import re

pattern = re.compile(r'\s+')

print "Air drop"
airDropDf = pd.read_csv("./data/airDrop.csv", delimiter=',', quotechar='"', encoding="utf-8")
airDropDf.columns = ['eth_address', 'token_amount']

print "Air drop 2"
airDropDf2 = pd.read_csv("./data/airDrop2.csv", delimiter=',', quotechar='"', encoding="utf-8")
airDropDf2.columns = ['eth_address', 'token_amount']


all_addresses_result = pd.concat([airDropDf,airDropDf2])

print(airDropDf.shape)
print(airDropDf2.shape)
print(all_addresses_result.shape)

print "User collecte"

userCollecteDf = pd.read_csv("./data/userCollecte.csv", delimiter=',', quotechar='"', encoding="utf-8")

userCollecteDf['Preallocation tokens'] = userCollecteDf['Preallocation tokens'].str.replace(',', '.')
#userCollecteDf['Preallocation tokens'] = userCollecteDf['Preallocation tokens'].str.replace(r'/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g','')

#str = str.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g,'');
#sentence = re.sub(pattern, '', sentence)


userCollecteDf['Preallocation tokens'] = pd.to_numeric(userCollecteDf['Preallocation tokens'],errors='coerce')


#ID	Status	Registration Date	Email	First Name	Last Name	Birth Date	ID Document Url	Eth address	KYC Flag	Transactions				Exchange rate	Bonus	Number of tokens		Preallocation tokens
userCollecteEthAddress = userCollecteDf['Eth address']
userCollecteTokenAmount = userCollecteDf['Preallocation tokens']
userCollecteCleanDf = None
print("displaying the collected addresses")
for i in range(1, userCollecteEthAddress.size):
    #print "Ether address %s and token amount %d" % (userCollecteEthAddress[i],userCollecteTokenAmount[i])

    #print isinstance(userCollecteEthAddress[i], unicode)
    #print isinstance(userCollecteTokenAmount[i], float)
    #if isinstance(userCollecteTokenAmount[i], float):
    #    print math.isnan(userCollecteTokenAmount[i])
    #print "Ether address {ethaddress} and token amount {tokenamount}".format(ethaddress=userCollecteEthAddress[i],
    #                                                                         tokenamount=userCollecteTokenAmount[i])

    if (isinstance(userCollecteEthAddress[i], unicode) and isinstance(userCollecteTokenAmount[i], float) and not math.isnan(userCollecteTokenAmount[i])):
        #print "Ether address {ethaddress} and token amount {tokenamount}".format(ethaddress = userCollecteEthAddress[i], tokenamount=userCollecteTokenAmount[i])
        eth_address =  "0x"+userCollecteEthAddress[i]
        token_amount = userCollecteTokenAmount[i]
        print(len(eth_address))
        d = {'eth_address': [eth_address,], 'token_amount': [userCollecteTokenAmount[i],]}
        row = pd.DataFrame(data=d)
        userCollecteCleanDf = pd.concat([userCollecteCleanDf,row])
        #print(userCollecteCleanDf.shape)

#print('address description')
#for index in range(0,userCollecteCleanDf.shape[0]):
    #    print userCollecteCleanDf['eth_address'][index]

print(all_addresses_result.shape)

all_addresses_result = pd.concat([userCollecteCleanDf,all_addresses_result])
print(userCollecteCleanDf.shape)
print(all_addresses_result.shape)
all_addresses_result['token_amount']=all_addresses_result['token_amount']*100

print("summing up the multiple contributions")
print(all_addresses_result.shape)
all_addresses_result = all_addresses_result.groupby(['eth_address']).sum().reset_index()
print(all_addresses_result.shape)

print("Writing file")
all_addresses_result.to_csv('./data/allContributions.csv', index = False)