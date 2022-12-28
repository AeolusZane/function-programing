len::[Int]->Int
len [] = 0
len (x:xs) = 1 + len xs

main = do
    print(len [1,2,2,4,5])