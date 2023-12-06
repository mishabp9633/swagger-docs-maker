const swaggerDocTemplate = (name) => `
tags:
- name: ${name}
  description: ${name} API

paths:

#----${name}-----------------

# [GET] ${name}/admin/all
  /${name}/admin/all:
    get:
      tags:
      - ${name}
      summary: Find All ${name}
      parameters:
      - name: Authorization
        in: header
        description: Bearer Token
        required: true
        type: string
        format: "Bearer {token}"
      - name: Search
        in: query
        description: |
          Search Available for {"title", "description"}
          Format: ?search=ABC..
        required: false
        type: string 
      - name: Filters
        in: query
        description: |
          Filter values that need to be considered for filter 
          Format: ?school=ABC..
        required: false
        explode: true
        type: string
        default: --
        enum:
          - --
          - --
          - --         
      responses:
        200:
          description: 'OK'
          schema:
            type: array
            items:
              $ref: '#/definitions/${name}'
        500:
          description: 'Server Error'

# [POST] ${name}/admin/new
  /${name}/admin/new:
    post:
      tags:
      - ${name}
      summary: Add ${name}
      parameters:
      - name: Authorization
        in: header
        description: Bearer Token
        required: true
        type: string
        format: "Bearer {token}"
      - name: body
        in: body
        description: ${name} Data
        required: true
        schema:
          $ref: '#/definitions/${name}'
      responses:
        201:
          description: 'Created'
        400:
          description: 'Bad Request'
        409:
          description: 'Conflict'
        500:
          description: 'Server Error'

# [GET] ${name}/admin/id
  /${name}/admin/{id}:
    get:
      tags:
      - ${name}
      summary: Find ${name} By Id
      parameters:
      - name: Authorization
        in: header
        description: Bearer Token
        required: true
        type: string
        format: "Bearer {token}"
      - name: id
        in: path
        description: ${name} Id
        required: true
        type: string  
      responses:
        200:
          description: 'OK'
          schema:
            $ref: '#/definitions/${name}'          
        409:
          description: 'Conflict'
        500:
          description: 'Server Error'

# [PUT] ${name}/admin/id
    put:
      tags:
      - ${name}
      summary: Update ${name} By Id
      parameters:
      - name: Authorization
        in: header
        description: Bearer Token
        required: true
        type: string
        format: "Bearer {token}"
      - name: id
        in: path
        description: ${name} Id
        required: true
        type: string
      - name: body
        in: body
        description: ${name} Data
        required: true
        schema:
          $ref: '#/definitions/${name}'
      responses:
        200:
          description: 'OK'
        400:
          description: 'Bad Request'
        409:
          description: 'Conflict'
        500:
          description: 'Server Error'

# [DELETE] /${name}/admin/id
    delete:
      tags:
      - ${name}
      summary: Delete ${name} By Id
      parameters:
      - name: Authorization
        in: header
        description: Bearer Token
        required: true
        type: string
        format: "Bearer {token}"
      - name: id
        in: path
        description: ${name} Id
        required: true
      responses:
        200:
          description: 'OK'
        409:
          description: 'Conflict'
        500:
          description: 'Server Error'

# definitions
definitions:
  ${name}:
    type: object
    required:
        - title
        - description
        - ${name}_images
    properties:
      _id:
        description: ${name} Id
      title:
        type: string
        example: 'title'
        description: ${name} title
      description:
        type: string
        example: 'description'
        description: ${name} description
      ${name}_images:
        type: array
        items:
          type: object
          properties:
            url:
              type: string
              example: 'https://cloudinary/imageUrl'
              description: URL of the flag image
            public_id:
              type: string
              example: 'publicId'
              description: Public ID of the image
        description: ${name} ${name}_images        

schemes:
 - https
 - http 

`;

 module.exports = {
  swaggerDocTemplate
};