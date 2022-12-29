-- currying
-- 2.3.1
plus1 :: (Int, Int) -> Int
plus1 (x, y) = x + y

plus :: Int -> Int -> Int
plus x y = x + y
