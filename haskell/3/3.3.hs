roots::Float->Float->Float->(Float,Float)
roots a b c = let x1 = (-b + sqrt (b^2 - 4*a*c)) / (2*a)
                  x2 = (-b - sqrt (b^2 - 4*a*c)) / (2*a)
              in (x1,x2)

main = do
    print(roots 1 3 2)  -- (-1.0,-2.0)