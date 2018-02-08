#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pandas as pd
import math
import re

pattern = re.compile(r'\s+')

print "Things done"
eth_address_path = './data/eth_address.txt'
token_amount_path = './data/amounts.txt'

eth_address_Df = pd.read_csv(eth_address_path, delimiter=',', quotechar='"', encoding="utf-8")
token_amount_Df = pd.read_csv(token_amount_path, delimiter=',', quotechar='"', encoding="utf-8")

print(eth_address_Df.shape)
print(token_amount_Df.shape)

reconciliation_Df = pd.concat([eth_address_Df,token_amount_Df], axis=1)

print(reconciliation_Df.shape)
print("Unique addresses")
print(len(set(reconciliation_Df['eth_address'])))
un_reconciliation_Df = reconciliation_Df.groupby(['eth_address']).sum().reset_index()
print("Summed up dataframe")
print(un_reconciliation_Df.shape)


print("Writing file")
un_reconciliation_Df.to_csv('./data/reconciliation.csv', index = False)




