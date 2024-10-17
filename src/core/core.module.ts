// import { DynamicModule, Module } from '@nestjs/common';
// import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';

// @Module({})
// export class CoreModule {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
//     const imports = [];
    
//     if (options.driver === 'typeorm') {
//       imports.push(TypeOrmAlunoPersistenceModule)
//     } else if (options.driver === 'in-memory') {
//       throw new Error('Não foi implementado.')
//     } else if (options.driver === 'in-file') {
//       throw new Error('Não foi implementado.')
//     }

//     return {
//       module: CoreModule,
//       imports,
//     };
//   }
// }