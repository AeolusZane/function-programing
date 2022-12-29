und :: Bool->Bool->Bool
und True y = y
und x y = False

unclear::Int->Bool
unclear x = not (unclear x)

main = do
    print(und False (unclear 0))