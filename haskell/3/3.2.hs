-- 声明一个中缀运算符
divide :: Float -> Float -> Float
divide = (/)

main = do
    print (36 `divide` 6 `divide` 2) -- 3.0 not 12.0 从左开始
    print (1:2:[]) -- [1,2] 从右开始