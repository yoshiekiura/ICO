#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pandas as pd
import math
import re

pattern = re.compile(r'\s+')

print "Things done"
things_done_path = 'C:\\My_NAPX_ICO\\DATA_ICO\\allContributions_done_28_12.csv'
thingsDoneDf = pd.read_csv(things_done_path, delimiter=',', quotechar='"', encoding="utf-8")
print(thingsDoneDf.shape)

print(thingsDoneDf['eth_address'])
print(thingsDoneDf['token_amount'])


print "User collect from userCollecteNoLoss.csv"
userCollecteNoLossDf = pd.read_csv("./data/userCollecteNoLoss.csv", delimiter=',', quotechar='"', encoding="utf-8")
userCollecteNoLossDf['Preallocation tokens'] = userCollecteNoLossDf['Preallocation tokens'].str.replace(',', '.')

userCollecteNoLossDf['Preallocation tokens'] = pd.to_numeric(userCollecteNoLossDf['Preallocation tokens'],errors='coerce')


#ID	Status	Registration Date	Email	First Name	Last Name	Birth Date	ID Document Url	Eth address	KYC Flag	Transactions				Exchange rate	Bonus	Number of tokens		Preallocation tokens
userCollecteNoLossEthAddress = userCollecteNoLossDf['Eth address']
userCollecteNoLossTokenAmount = userCollecteNoLossDf['Preallocation tokens']
userCollecteNoLossCleanDf = None
print("displaying the collected addresses")
for i in range(0, userCollecteNoLossEthAddress.size):
    #print "Ether address %s and token amount %d" % (userCollecteEthAddress[i],userCollecteTokenAmount[i])

    #print isinstance(userCollecteEthAddress[i], unicode)
    #print isinstance(userCollecteTokenAmount[i], float)
    #if isinstance(userCollecteTokenAmount[i], float):
    #    print math.isnan(userCollecteTokenAmount[i])
    #print "Ether address {ethaddress} and token amount {tokenamount}".format(ethaddress=userCollecteEthAddress[i],
    #                                                                         tokenamount=userCollecteTokenAmount[i])

    if (isinstance(userCollecteNoLossEthAddress[i], unicode) and isinstance(userCollecteNoLossTokenAmount[i], float) and not math.isnan(userCollecteNoLossTokenAmount[i])):
        #print "Ether address {ethaddress} and token amount {tokenamount}".format(ethaddress = userCollecteEthAddress[i], tokenamount=userCollecteTokenAmount[i])
        eth_address =  "0x"+userCollecteNoLossEthAddress[i]
        token_amount = userCollecteNoLossTokenAmount[i]
        #print(len(eth_address))
        d = {'eth_address': [eth_address,], 'token_amount': [token_amount*100,]}
        row = pd.DataFrame(data=d)
        userCollecteNoLossCleanDf = pd.concat([userCollecteNoLossCleanDf,row])
        #print(userCollecteCleanDf.shape)

#print('address description')
#for index in range(0,userCollecteCleanDf.shape[0]):
    #    print userCollecteCleanDf['eth_address'][index]


print "User collect from userCollecte.csv"
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
        d = {'eth_address': [eth_address,], 'token_amount': [token_amount*100,]}
        row = pd.DataFrame(data=d)
        userCollecteCleanDf = pd.concat([userCollecteCleanDf,row])
        #print(userCollecteCleanDf.shape)

#print('address description')
#for index in range(0,userCollecteCleanDf.shape[0]):
    #    print userCollecteCleanDf['eth_address'][index]


print(userCollecteNoLossCleanDf.shape)
print(userCollecteCleanDf.shape)
userCollecteNoLossCleanDf = userCollecteNoLossCleanDf.reset_index()
userCollecteCleanDf = userCollecteCleanDf.reset_index()
print(userCollecteNoLossCleanDf.shape)
print(userCollecteCleanDf.shape)

noLossEthAddressCol = userCollecteNoLossCleanDf['eth_address']
noLossTokenAmountCol = userCollecteNoLossCleanDf['token_amount']

lossEthAddressCol = userCollecteCleanDf['eth_address']

noLossLength = noLossEthAddressCol.size
lossLength = lossEthAddressCol.size

print(noLossLength)
print(lossLength)

userCollecteMissedDf = None
counter = 0
for noloss_i in range(0,noLossLength):
    noLossEthAddressI = noLossEthAddressCol[noloss_i]
    noLossTokenAmountI = noLossTokenAmountCol[noloss_i]
    #print(noLossEthAddressI)
    if noLossEthAddressI not in set(lossEthAddressCol):
        #print("not found")
        counter = counter + 1
        d = {'eth_address': [noLossEthAddressI, ], 'token_amount': [noLossTokenAmountI, ]}
        row = pd.DataFrame(data=d)
        userCollecteMissedDf = pd.concat([userCollecteMissedDf, row])

print("diff")
print(counter)
print(userCollecteMissedDf.shape)

print("Writing file")
userCollecteMissedDf.to_csv('./data/allMissedContributions.csv', index = False)




