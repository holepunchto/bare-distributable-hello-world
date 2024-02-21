cmake_minimum_required(VERSION 3.25)

set(name bare_distributable_hello_world)

project(${name} C)

include(bare)

bare_target(target)

add_subdirectory(vendor/bare EXCLUDE_FROM_ALL)

add_library(${name} STATIC)

target_link_libraries(
  ${name}
  PUBLIC
    $<LINK_LIBRARY:WHOLE_ARCHIVE,bare_static>
)

link_bare_modules(${name} AMALGAMATE)

add_executable(${name}_bin)

add_bare_bundle(
  ENTRY src/main.js
  OUT src/main.bundle.h
  TARGET c
)

target_sources(
  ${name}_bin
  PRIVATE
    src/main.bundle.h
    src/main.c
)

set_target_properties(
  ${name}_bin
  PROPERTIES
  ENABLE_EXPORTS ON
  OUTPUT_NAME ${name}
)

target_link_libraries(
  ${name}_bin
  PUBLIC
    ${name}
)
