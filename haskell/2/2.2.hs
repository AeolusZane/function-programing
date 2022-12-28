maxi :: (Int, Int) -> Int
maxi (x, y) = if x > y then x else y

main = do
    print(maxi (12 - 1, 12))