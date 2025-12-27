# @zodyac/illuma-reflect

[Illuma](https://github.com/git-zodyac/illuma) plugin for reflect-metadata based dependency injection to declare dependencies via constructor parameters and decorators.

## Installation

Requires `@zodyac/illuma` version `^1.6.3` or higher.

Assuming you have `@zodyac/illuma` installed, you can add this plugin and `reflect-metadata` via Yarn or NPM:

```bash
yarn add @zodyac/illuma-reflect reflect-metadata
# or
npm install @zodyac/illuma-reflect reflect-metadata
```

## Usage

This plugin provides decorators to enable reflection-based dependency injection with `@zodyac/illuma`.

```typescript
import "reflect-metadata"; // Import this once at the entry point
import { NodeContainer, NodeInjectable, NodeToken, nodeInject } from "@zodyac/illuma";
import { ReflectInjectable, Inject, Optional } from "@zodyac/illuma-reflect";

// Define tokens
const API_KEY = new NodeToken<string>("API_KEY");

// Standard Illuma service
@NodeInjectable()
class Logger {
  public log(message: string) {
    console.log(message);
  }
}

// Service using ReflectInjectable
@ReflectInjectable()
class UserService {
  // Compatible with nodeInject property injection
  private readonly config = nodeInject(CONFIG_TOKEN);

  constructor(
    // Automatically resolved by type
    private readonly logger: Logger,

    // Optional dependency
    @Optional() private readonly tracer?: TracerService,

    // Token injection
    @Inject(API_KEY) private readonly key: string,
  ) {}

  public greet() {
    this.logger.log(`Hello! Key: ${this.apiKey}`);
  }
}

// Setup container
const container = new NodeContainer();

container.provide({ provide: API_KEY, value: "secret-123" });
container.provide(Logger);
container.provide(UserService);

container.bootstrap();

// Resolve
const user = container.get(UserService);
user.greet();
```

## Compatibility

`@zodyac/illuma-reflect` is fully compatible with standard `@zodyac/illuma` decorators and injection methods. You can mix and match `@NodeInjectable`, `nodeInject`, and `@ReflectInjectable`, `@Inject` as needed.

## Features

- `@ReflectInjectable()`: Marks a class as injectable (similarly to `@NodeInjectable()`) and resolves constructor dependencies automatically.
- `@Inject(token)`: Property or parameter decorator for token injection, alternative to `nodeInject`.
- `@Optional()`: Marks a constructor dependency as optional.

## License

MIT
