three :: Int -> Int
three x = 3

non_term :: Int -> Int
non_term x = non_term(x + 1)

main = do
    print(three(non_term(0))) 
    -- if any eval terminates, then outmost eval also terminate
    -- 但在1.hs中，outmost后算效率更高，outmost可能eval同一个表达式多次

-- what haskell does ?
-- lazy evaluation，跟踪并通过引用实现 x * x

