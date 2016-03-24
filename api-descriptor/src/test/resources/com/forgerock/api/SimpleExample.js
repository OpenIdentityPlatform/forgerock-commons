/*
 * The contents of this file are subject to the terms of the Common Development and
 * Distribution License (the License). You may not use this file except in compliance with the
 * License.
 *
 * You can obtain a copy of the License at legal/CDDLv1.0.txt. See the License for the
 * specific language governing permission and limitations under the License.
 *
 * When distributing Covered Software, include this CDDL Header Notice in each file and include
 * the License file at legal/CDDLv1.0.txt. If applicable, add the following below the CDDL
 * Header, with the fields enclosed by brackets [] replaced by your own identifying
 * information: "Portions copyright [year] [name of copyright owner]".
 *
 * Copyright 2016 ForgeRock AS.
 */

var imports = JavaImporter(
    Packages.com.forgerock.api.beans,
    org.forgerock.json.JsonValue,
    com.fasterxml.jackson.databind.ObjectMapper,
    com.fasterxml.jackson.annotation.JsonInclude);

with (imports) {
    var jsonValue = JsonValue.json(JsonValue.object());

    var responseSchema = Schema.schema()
        .schema(jsonValue)
        .build();

    var action1 = Action.action()
        .name("action1")
        .response(responseSchema)
        .build();
    var action2 = Action.action()
        .name("action2")
        .response(responseSchema)
        .build();

    var resourceV1 = Resource.resource()
        .action(action1)
        .build();
    var resourceV2 = Resource.resource()
        .action(action1)
        .action(action2)
        .build();

    var versionedPath = VersionedPath.versionedPath()
        .put("1.0", resourceV1)
        .put("2.0", resourceV2)
        .build();

    var paths = Paths.paths(VersionedPath)
        .put("/testPath", versionedPath)
        .build();

    var apiDescription = ApiDescription.apiDescriptionWithVersionedPaths()
        .id("frapi:test")
        .paths(paths)
        .build();

    // print JSON to standard-out
    var objectMapper = new ObjectMapper()
        .setSerializationInclusion(JsonInclude.Include.NON_NULL)
        .setSerializationInclusion(JsonInclude.Include.NON_EMPTY);

    java.lang.System.out.println(objectMapper.writeValueAsString(apiDescription));
}