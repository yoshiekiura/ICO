import pandas as pd

xls = pd.ExcelFile("./data/Token_allocation_presale_21122017.xls")

userCollecteDf = xls.parse(1) #2 is the sheet number

#ID	Status	Registration Date	Email	First Name	Last Name	Birth Date	ID Document Url	Eth address	KYC Flag	Transactions				Exchange rate	Bonus	Number of tokens		Preallocation tokens

userCollecteEthAddress = userCollecteDf['Eth address']
userCollecteTokenAmount = userCollecteDf['Preallocation tokens']

print("displaying the collected addresses")
for i in range(1, userCollecteEthAddress.size):
    #print "Ether address %s and token amount %d" % (userCollecteEthAddress[i],userCollecteTokenAmount[i])
    print "Ether address {ethaddress} and token amount {tokenamount}".format(ethaddress = userCollecteEthAddress[i], tokenamount=userCollecteTokenAmount[i])

