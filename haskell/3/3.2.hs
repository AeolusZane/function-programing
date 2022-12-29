-- 声明一个中缀运算符
divide :: Float -> Float -> Float
divide = (/)

main = do
    print (36 `divide` 6 `divide` 2) -- 3.0 not 12.0 从左开始
    print (1:2:[]) -- [1,2] 从右开始

---------

-- 中缀运算符需要声明哪边优先
infixl `divide` -- 左结合 默认
infixr `divide` -- 右结合 
infix  `divide` -- 无结合 必须加括号

infixl `divide` -- 左结合 默认
a `divide` b = a / b

-- 声明一个中缀运算符
infixr `divide` -- 左结合 默认
a `divide` b = a / b

main = do
    print (36 `divide` 6 `divide` 2)

---------

-- binding priority (0-9 default 9)
(%%) :: Int->Int->Int
a %% b = a + b

(@@) :: Int->Int->Int
a @@ b = a * b


main = do
    print (1 %% 3 @@ 2) -- 8 or 7


-- binding priority (0-9 default 9)
(%%) :: Int->Int->Int
a %% b = a + b

(@@) :: Int->Int->Int
a @@ b = a * b
infixl 8 `%%`
infixl 9 `@@`

main = do
    print (1 %% 3 @@ 2) -- 8 or 7

