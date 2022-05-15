import pandas as pd

df = pd.DataFrame([[1,0,2],[1,2,3],[0,1,2],[4,5,6]])
# >>> df
#    0  1  2
# 0  1  0  2
# 1  1  2  3
# 2  0  1  2
# 3  4  5  6
# >>> df == 0
#        0      1      2
# 0  False   True  False
# 1  False  False  False
# 2   True  False  False
# 3  False  False  False
a=df[1].tolist()
print(type(a))